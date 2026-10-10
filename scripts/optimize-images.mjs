/**
 * 원본 사진을 배포용 WebP로 변환한다.
 *
 * 카메라 원본(장당 8~47MB, 최대 60MP)을 그대로 배포하면 Vercel의 이미지 변환·전송
 * 비용이 급격히 늘어난다. .app 카드는 최대 폭 480px이므로 긴 변 1600px이면 충분하며,
 * 미리 변환해 두고 next.config 의 images.unoptimized 를 켜면 런타임 변환 과금이 없다.
 *
 * 실행: node scripts/optimize-images.mjs
 * 원본을 originals/ 로 옮긴 뒤에도 그대로 재실행할 수 있도록 입력 경로를 탐색한다.
 */

import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const SOURCE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

/** 원본이 originals/ 로 이동한 뒤에도 동작하도록 후보 경로를 순서대로 탐색한다. */
function resolveSourceDir(candidates) {
  return candidates.find((dir) => existsSync(dir) && listSourceFiles(dir).length > 0);
}

function listSourceFiles(dir) {
  return readdirSync(dir)
    .filter((name) => {
      const path = join(dir, name);
      return statSync(path).isFile() && SOURCE_EXTENSIONS.has(extname(name).toLowerCase());
    })
    .sort();
}

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function formatBytes(bytes) {
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)}MB`;
  return `${Math.round(bytes / 1024)}KB`;
}

/**
 * 긴 변을 maxEdge 로 맞춰 WebP 로 저장한다.
 * rotate() 를 먼저 호출해 EXIF 회전값을 픽셀에 적용하고(세로 사진이 눕는 것 방지),
 * withMetadata() 를 쓰지 않아 EXIF(촬영 장비·GPS 등)는 함께 제거된다.
 */
async function toWebp(inputPath, outputPath, { maxEdge, quality }) {
  await sharp(inputPath)
    .rotate()
    .resize(maxEdge, maxEdge, { fit: "inside", withoutEnlargement: true })
    .webp({ quality })
    .toFile(outputPath);
}

/** 정사각 중앙 크롭 — 카카오/OG 공유 썸네일용. */
async function toSquareWebp(inputPath, outputPath, { size, quality }) {
  await sharp(inputPath)
    .rotate()
    .resize(size, size, { fit: "cover", position: "center" })
    .webp({ quality })
    .toFile(outputPath);
}

const VARIANTS = [
  { dir: "thumb", maxEdge: 640, quality: 75 },
  { dir: "full", maxEdge: 1600, quality: 80 },
];

async function convertGallery() {
  const sourceDir = resolveSourceDir(["originals/gallery", "public/images/gallery"]);
  if (!sourceDir) {
    console.log("· 갤러리: 원본을 찾을 수 없어 건너뜁니다.");
    return null;
  }

  const files = listSourceFiles(sourceDir);
  console.log(`\n■ 갤러리 (${sourceDir}, ${files.length}장)`);

  let sourceBytes = 0;
  const outputBytes = {};

  for (const variant of VARIANTS) {
    ensureDir(join("public/images/gallery", variant.dir));
    outputBytes[variant.dir] = 0;
  }

  for (const file of files) {
    const inputPath = join(sourceDir, file);
    // 출력 파일명은 소문자 .webp 로 통일한다. 원본 확장자의 대소문자(.JPG/.jpg)가
    // 섞여 있어 대소문자를 구분하는 Linux 배포 환경에서 404 가 났던 문제의 재발 방지.
    const stem = basename(file, extname(file)).toLowerCase();
    sourceBytes += statSync(inputPath).size;

    for (const variant of VARIANTS) {
      const outputPath = join("public/images/gallery", variant.dir, `${stem}.webp`);
      await toWebp(inputPath, outputPath, variant);
      outputBytes[variant.dir] += statSync(outputPath).size;
    }
    process.stdout.write(".");
  }

  console.log("");
  for (const variant of VARIANTS) {
    const total = outputBytes[variant.dir];
    console.log(
      `  ${variant.dir.padEnd(5)} ${String(variant.maxEdge).padStart(4)}px q${variant.quality}  ` +
        `${formatBytes(total)} (장당 평균 ${formatBytes(total / files.length)})`
    );
  }
  console.log(`  원본 ${formatBytes(sourceBytes)} → 변환본 합계 ${formatBytes(
    VARIANTS.reduce((sum, v) => sum + outputBytes[v.dir], 0)
  )}`);

  return { sourceDir, files };
}

async function convertNotice() {
  const sourceDir = resolveSourceDir(["originals/notice", "public/images/notice"]);
  if (!sourceDir) {
    console.log("\n· 안내사항 이미지: 원본을 찾을 수 없어 건너뜁니다.");
    return;
  }

  const files = listSourceFiles(sourceDir);
  console.log(`\n■ 안내사항 (${sourceDir}, ${files.length}장)`);

  ensureDir("public/images/notice");
  let sourceBytes = 0;
  let outputBytes = 0;

  for (const file of files) {
    const inputPath = join(sourceDir, file);
    const stem = basename(file, extname(file)).toLowerCase();
    const outputPath = join("public/images/notice", `${stem}.webp`);
    sourceBytes += statSync(inputPath).size;
    await toWebp(inputPath, outputPath, { maxEdge: 1200, quality: 80 });
    outputBytes += statSync(outputPath).size;
    console.log(`  ${file} → ${stem}.webp  ${formatBytes(statSync(outputPath).size)}`);
  }

  console.log(`  원본 ${formatBytes(sourceBytes)} → 변환본 ${formatBytes(outputBytes)}`);
}

/** 공유 썸네일은 카카오 피드 템플릿·OG 메타용이라 원본 대신 전용 파일을 쓴다. */
async function convertShareThumbnail(gallery) {
  if (!gallery) {
    console.log("\n· 공유 썸네일: 갤러리 원본이 없어 건너뜁니다.");
    return;
  }

  const source = gallery.files[0];
  const inputPath = join(gallery.sourceDir, source);
  const outputPath = "public/images/og-share.webp";

  await toSquareWebp(inputPath, outputPath, { size: 800, quality: 80 });
  console.log(
    `\n■ 공유 썸네일\n  ${source} → og-share.webp  800x800  ${formatBytes(
      statSync(outputPath).size
    )}`
  );
}

async function main() {
  const gallery = await convertGallery();
  await convertNotice();
  await convertShareThumbnail(gallery);
  console.log("\n완료.");
}

await main();
