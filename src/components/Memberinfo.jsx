//현재 이 함수는 Who We Are을 구성하는 컴포넌트 요소이고 각각의 매개변수로 제목, 이미지, 설명을 받는다. 

import './animate-gradient.css';

export default function Memberinfo({ role, title, image, description }) {
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
            <section style={{ whiteSpace: 'pre-line' }} className="basis-3/5 mt-10 rounded-xl w-auto md:p-0 bg-slate-800 animate-gradient-diagonal">
                <img className="w-32 h-32 rounded-full mx-auto m-8" src={image} alt={title} width="120" height="120" />
                <div className="pt-6 md:p-4 text-center md:text-left ">
                    <blockquote>
                        <p className="text-lg font-medium text-slate-400 opacity-50">
                            Ria Project Member
                        </p>
                    </blockquote>
                    <figcaption className="font-medium">
                        <div className="text-indigo-800 font-semibold dark:text-sky-400">
                            {title}
                        </div>
                        {role === 1 || role === 3 ? (
                            <div className="text-slate-700 font-semibold dark:text-slate-500">
                                {description}
                            </div>
                        ) : (
                            <div className="text-slate-300 font-semibold dark:text-slate-500">
                                {description}
                            </div>
                        )}
                    </figcaption>
                </div>
            </section>
        </div>
    );
}