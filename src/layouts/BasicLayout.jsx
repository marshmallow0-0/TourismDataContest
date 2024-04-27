//NOTE
//전체적인 레이아웃은 헤더와 푸터는 고정되고 그 안의 자식요소들(children) 은 변경된다.  
//영역 확인을 위해 배경색을 변경하면 확인해볼 수 있다. 
//div 영역을 화면 전체를 채우도록 h-full로 설정 
//main 부분에서 mx-auto 가운데 정렬과 min-h-screen 화면 전체를 채우도록 mt-20은 네비게이션 바와 겹치지 않기 위해 

import Footer from "./Footer";
import Header from "./Header";
const BasicLayout = ({ children }) => {
    return (
        <>
            <div className="h-full">
                <Header />
                <main className="mt-20 mx-auto min-h-screen">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}
export default BasicLayout;