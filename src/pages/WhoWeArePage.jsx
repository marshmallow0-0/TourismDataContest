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
            <div className="grid grid-cols-2 gap-1 my-30 mx-80 place-content-center">
                {MEMBERINTRODUCE.map((guide) => <motion.div
                    ref={ref}
                    initial=""
                    //animate={animation}
                    variants={opacityVariants}
                ><Memberinfo {...guide} />

                </motion.div>
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