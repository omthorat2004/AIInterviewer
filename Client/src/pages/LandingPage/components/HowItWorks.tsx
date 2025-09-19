import { motion } from "framer-motion";

import { FaUpload, FaBrain, FaBullseye, FaTrophy } from "react-icons/fa";

interface Step {

    step: number;

    icon: React.ElementType;

    title: string;

    description: string;

    gradient: string;

    bg: string;

    border: string;
}

const HowItWorks: React.FC = () => {

    const steps: Step[] = [

        {
            step: 1,

            icon: FaUpload,

            title: "Upload Your Resume",

            description: "Simply upload your current resume or create one from scratch using our intuitive builder.",

            gradient: "from-blue-500 to-cyan-500",

            bg: "bg-blue-50",

            border: "border-blue-200"
        },

        {

            step: 2,

            icon: FaBrain,

            title: "AI Analysis & Optimization",

            description: "Our Gemini AI analyzes your resume, identifies improvement areas and suggests powerful optimizations.",

            gradient: "from-purple-500 to-pink-500",

            bg: "bg-purple-50",

            border: "border-purple-200"
        },

        {
            step: 3,

            icon: FaBullseye,

            title: "Get Matched Opportunities",

            description: "Receive personalized job recommendations and interview prep tailored to your profile.",

            gradient: "from-green-500 to-teal-500",

            bg: "bg-green-50",

            border: "border-green-200"
        },

        {
            step: 4,

            icon: FaTrophy,

            title: "Land Your Dream Job",

            description: "With optimized applications and thorough preparation, secure interviews and offers faster.",

            gradient: "from-orange-500 to-red-500",

            bg: "bg-orange-50",

            border: "border-orange-200"
        },

    ];

    return (

        <section className="py-20 bg-white">

            <div className="container px-4 mx-auto sm:px-6 lg:px-8">

                {/* Heading */}

                <motion.div

                    className="mb-16 text-center"

                    initial={{ opacity: 0, y: 20 }}

                    whileInView={{ opacity: 1, y: 0 }}

                    transition={{ duration: 0.6 }}

                    viewport={{ once: true }}
                >

                    <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">

                        How It{" "}

                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">

                            Works

                        </span>

                    </h2>

                    <p className="max-w-3xl mx-auto text-xl text-gray-600">

                        Our streamlined process takes you from application to offer in four simple steps.

                    </p>

                </motion.div>

                {/* Steps */}

                <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4">

                    {
                        steps.map(({ step, icon: Icon, title, description, gradient, bg, border }, item) => (

                            <motion.div

                                key={step}

                                className="relative text-center rounded-xl hover:scale-105 hover:shadow-xl transition-transform duration-300"

                                initial={{ opacity: 0, y: 40 }}

                                whileInView={{ opacity: 1, y: 0 }}

                                transition={{ duration: 0.6, delay: item * 0.2 }}

                                viewport={{ once: true }}
                            >
                                {/* Connection Line */}

                                {
                                    item < steps.length - 1 && (

                                        <div className="absolute top-1/2 left-full hidden w-full h-0.5 -translate-y-1/2 transform bg-gray-200 lg:block" />
                                    )
                                }

                                {/* Step Number */}

                                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 text-xl font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600">

                                    {step}

                                </div>

                                {/* Icon */}

                                <div

                                    className={`inline-flex p-4 mb-6 rounded-xl border bg-gradient-to-r ${gradient} ${bg} ${border}`}
                                >

                                    <Icon className="w-8 h-8 text-white" aria-hidden="true" />

                                </div>

                                <h3 className="mb-4 text-xl font-bold text-gray-900">{title}</h3>

                                <p className="text-gray-600">{description}</p>

                            </motion.div>

                        ))
                    }

                </div>

                {/* Bottom Badge */}

                <motion.div

                    className="mt-16 text-center"

                    initial={{ opacity: 0, y: 20 }}

                    whileInView={{ opacity: 1, y: 0 }}

                    transition={{ duration: 0.6, delay: 0.8 }}

                    viewport={{ once: true }}
                >

                    <div className="inline-flex items-center gap-3 px-6 py-3 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">

                        <FaBrain className="w-5 h-5 text-blue-600" aria-hidden="true" />

                        <span className="font-medium text-blue-800">

                            Powered by Google Gemini AI for Maximum Accuracy

                        </span>

                    </div>

                </motion.div>

            </div>

        </section>
    );
};

export default HowItWorks;