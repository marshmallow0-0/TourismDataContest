import Introduce from "../components/WhoIntroduce";
import BasicLayout from "../layouts/BasicLayout";
import Memberinfo from "../components/Memberinfo";
import { INTRODUCE, MEMBERINTRODUCE } from "./data";
import { motion } from "framer-motion";
import useObserver from "../hooks/useObserver";
import { opacityVariants } from "../styles/animation";

const WhoWeArePage = () => {
    const { ref, animation } = useObserver();
    return (
        <BasicLayout>
            <div className="max-w-3xl mx-auto grid grid-cols-2 gap-1 my-30  place-content-center">
                {MEMBERINTRODUCE.map((guide) =>
                    <Memberinfo {...guide} />
                )}
            </div>
            <div className="mt-20"></div>
            {INTRODUCE.map((guide) => <motion.div
                ref={ref}
                initial="hidden"
                animate={animation}
                variants={opacityVariants}
            ><Introduce {...guide} />
            </motion.div>
            )
            }

        </BasicLayout>

    );
}

export default WhoWeArePage;