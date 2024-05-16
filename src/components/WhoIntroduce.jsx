//현재 이 함수는 Who We Are을 구성하는 컴포넌트 요소이고 각각의 매개변수로 제목, 이미지, 설명을 받는다. 
export default function Introduce({ title, image, description }) {
    return (
        <section style={{ whiteSpace: 'pre-line' }} className="flex items-center justify-center gap-4 p-4 ">
            <img className="w-64 h-64 rounded-md mr-11" src={image} alt={title} />
            <article className="w-64">
                <h2 className="text-center font-bold text-2xl font-Pretendard mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </article>
        </section>
    );
}