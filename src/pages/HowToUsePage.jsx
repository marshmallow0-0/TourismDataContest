import { motion } from "framer-motion";
import useObserver from "../hooks/useObserver";
import BasicLayout from "../layouts/BasicLayout";
import { opacityVariants } from "../styles/animation";
import { GUIDE_STEPS } from "./data";
const HowToUsePage = () => {
    const { ref, animation } = useObserver();

    return (
        <BasicLayout>
            <motion.div
                ref={ref}
                initial="hidden"
                animate={animation}
                variants={opacityVariants}
            >
                <main className="mx-auto">
                    {/* {GUIDE_STEPS.map((guide) => <Guide {...guide} />)} */}

                    <section className="flex justify-center p-10">
                        <img className="w-64 h-64 m-2 rounded-md" src={GUIDE_STEPS[0].image} alt="배경" />
                        <article className="mt-2 ml-12">
                            <header>
                                <h2 className="font-bold text-2xl font-serif m-2">{GUIDE_STEPS[0].title}</h2>
                            </header>
                            <ol className="text-gray-500 font-sans m-2">
                                <li className="p-2">
                                    가고싶거나 알아보고 싶은 랜드마크 사진을 준비합니다.
                                </li>
                                <li className="p-1">
                                    1. 사진 상태가 선명할수록 좋습니다.
                                </li>
                                <li className="p-1">
                                    2. 랜드마크 사진이여야 합니다.
                                </li>
                            </ol>
                        </article>
                    </section>

                    <section className="flex justify-center p-10">
                        <img className="bg-cover w-80 h-auto ml-36 rounded-md" src={GUIDE_STEPS[1].image} alt="배경" />
                        <article className="mt-2">
                            <header>
                                <h2 className="font-bold text-2xl font-serif m-2">{GUIDE_STEPS[1].title}</h2>
                            </header>
                            <ol className="text-gray-500 font-sans m-2">
                                <li className="p-2">
                                    사진을 드랍 박스 안에 드래그 앤 드랍으로 올려놓습니다.
                                </li>
                                <li className="p-1">
                                    1.  Ai가 당신의 사진을 분석하므로 시간이 걸릴 수 있습니다.
                                </li>
                                <li className="p-1">
                                    2. Ai Search 버튼이 회색에서 초록색으로 활성화 됩니다.
                                </li>
                                <li className="p-1">
                                    3. Ai Search 버튼을 클릭하면 결과 화면을 보여줍니다.
                                </li>
                            </ol>
                        </article>
                    </section>


                    <section className="flex justify-center p-10">
                        <img className="w-64 h-auto mt-2 rounded-md ml-56" src={GUIDE_STEPS[2].image} alt="배경" />
                        <article className="mt-2 ml-16">
                            <header>
                                <h2 className="font-bold text-2xl font-serif m-2">{GUIDE_STEPS[2].title}</h2>
                            </header>
                            <ol className="text-gray-500 font-sans m-2">
                                <li className="p-2">
                                    사진을 성공적으로 분석을 완료하였다면, 사용자에게 최대 5가지의 결과를 제공합니다.
                                </li>
                                <li className="p-1">
                                    1. 원하는 장소를 결과물에서 찾으셨다면 창을 클릭합니다.
                                </li>
                                <li className="p-1">
                                    2.장소의 더 자세한 정보를 간략하게 보여드립니다.
                                </li>
                                <li className="p-1">
                                    3.이 결과가 만족스럽다면 BookMark 버튼을 통해 편하게 다시 찾을 수 있습니다.
                                </li>
                            </ol>
                        </article>
                    </section>
                </main>
            </motion.div>
        </BasicLayout>

    );
}

export default HowToUsePage;