import React from 'react'

import JSConfetti from 'js-confetti';

export const Footer = () => {

      const fnExploreConfetti = () => {
        
        const confetti = new JSConfetti();
    
        confetti.addConfetti({
          emojis: ['🎉', '👰🏻‍♀️', '🤵🏻‍♂️', '✨', '💛', '💜', '💞', '🌸'],
          emojiSize: 70,
          confettiNumber: 50,
       })
      }
    
  return (
    <div className='footer py-25'>
        <p>
            항상 저희를 지켜봐주시고 지원해주신 부모님과 가족,<br/>
            그리고 응원과 축하의 마음을 전해주신 모든 분들께<br/>
            진심으로 감사드립니다.<br/>
            항상 건강하시고 행복하세요.
        </p>
        <button onClick={fnExploreConfetti}>
            좋아요 버튼
        </button>
    </div>
  )
}
