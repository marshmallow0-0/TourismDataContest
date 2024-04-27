import Introduce from "../components/WhoIntroduce";
import BasicLayout from "../layouts/BasicLayout";
import { INTRODUCE } from "./data";
import { motion } from "framer-motion";
import useObserver from "../hooks/useObserver";
import { opacityVariants } from "../styles/animation";

const WhoWeArePage = () => {
    const { ref, animation } = useObserver();
    return (
        <BasicLayout>
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