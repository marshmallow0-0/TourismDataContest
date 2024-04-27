//현재 이 함수는 Who We Are을 구성하는 컴포넌트 요소이고 각각의 매개변수로 제목, 이미지, 설명을 받는다. 
export default function Introduce({ title, image, description }) {
    return (
        <section style={{ whiteSpace: 'pre-line' }} className="flex items-center justify-center gap-4 p-4 ">
            <img className="w-64 h-64 rounded-md mr-11" src={image} alt={title} />
            <article className="w-64">
                <h2 className="font-bold text-2xl font-Pretendard mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </article>
        </section>
    );
}