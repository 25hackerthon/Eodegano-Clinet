import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <main className="main-content">
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>여행 템플릿 생성기</h1>
        <p>나만의 여행 계획을 만들어보세요!</p>
        <Link 
          to="/create" 
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            marginTop: '1rem'
          }}
        >
          여행 계획 만들기
        </Link>
      </div>
    </main>
  )
}

export default HomePage