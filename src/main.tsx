import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <App />
)

// 1. 코드는 정상임 => 값이 잘 나올 때가 있음
// 2. 똑같은 내용으로 테스트를 여러 번 진행하면 가끔 오류 발생 ( 개발 중일 때만 오류가 남 )
//  => 데이터를 외부에서 받아올 때
//     => 이 이유는, main.tsx의 "Strict Mode"