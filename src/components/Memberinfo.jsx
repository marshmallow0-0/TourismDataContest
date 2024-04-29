//현재 이 함수는 Who We Are을 구성하는 컴포넌트 요소이고 각각의 매개변수로 제목, 이미지, 설명을 받는다. 
export default function Memberinfo({ title, image, description }) {
    return (

        /*
        <section style={{ whiteSpace: 'pre-line' }} className="flex items-center justify-center gap-4 p-4 ">
            <img className="w-64 h-64 rounded-md mr-11" src={image} alt={title} />
            <article className="w-64">
                <h2 className="font-bold text-2xl font-Pretendard mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </article>
        </section>
        */
       //grid grid-flow-row-dense
            <div className="flex flex-row items-center justify-center w-auto">
                <section style={{ whiteSpace: 'pre-line' }} className="basis-3/5 mt-10 bg-slate-100 rounded-xl w-auto md:p-0 dark:bg-slate-800 ">
                    <img className="w-32 h-32 rounded-full mx-auto m-8" src='https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png' alt={title} width="120" height="120"/>
                    <div className="pt-6 md:p-4 text-center md:text-left ">
                        <blockquote>
                            <p className="text-lg font-medium text-white">
                                Ria Project Member
                            </p>
                        </blockquote>
                        <figcaption className="font-medium">
                            <div className="text-sky-500 dark:text-sky-400">
                                {title}
                            </div>
                            <div className="text-slate-700 dark:text-slate-500">
                                {description}
                            </div>
                        </figcaption>
                    </div>
                </section>
            </div>
    );
}