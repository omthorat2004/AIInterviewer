import { FaCheckCircle, FaBolt, FaBrain, FaBullseye } from "react-icons/fa";

interface SolutionItem {

    icon: React.ComponentType<{ className?: string }>;

    title: string;

    description: string;
}

const Solution: React.FC = () => {

    const solutions: SolutionItem[] = [

        {
            icon: FaBrain,

            title: "AI-Optimized Resumes",

            description: "Our Gemini-powered AI analyzes job descriptions and optimizes your resume for maximum ATS compatibility and recruiter appeal."
        },

        {
            icon: FaBullseye,

            title: "Intelligent Job Matching",

            description: "Stop wasting time on irrelevant positions. Our AI finds and ranks opportunities perfectly matched to your skills and career goals."
        },

        {
            icon: FaBolt,

            title: "Interview Mastery",

            description: "Practice with AI-generated interview questions tailored to your target role. Get instant feedback and improve your confidence."
        },
    ];

    return (

        <section className="py-20 bg-white">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}

                <div className="max-w-4xl mx-auto text-center mb-16">

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">

                        Your Career Success,{" "}

                        <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">

                            AI-Accelerated

                        </span>

                    </h2>

                    <p className="text-xl text-gray-600 leading-relaxed">

                        Transform every aspect of your job search with intelligent tools
                        that adapt to your unique career journey.

                    </p>

                </div>

                {/* Solutions Grid */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

                    {
                        solutions.map(({ icon: Icon, title, description }, index) => (

                            <div

                                key={index}

                                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                            >

                                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-6 mx-auto">

                                    <Icon className="w-8 h-8 text-white" />

                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">

                                    {title}

                                </h3>

                                <p className="text-gray-600 text-center leading-relaxed">

                                    {description}

                                </p>

                            </div>
                        ))
                    }

                </div>

                {/* CTA Section */}

                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">

                    <h3 className="text-2xl md:text-3xl font-bold mb-4">

                        Ready to Transform Your Career?

                    </h3>

                    <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">

                        Join thousands of professionals who have accelerated their career
                        growth with our AI-powered platform.

                    </p>

                    <div className="flex flex-wrap justify-center gap-6 text-sm">

                        <div className="flex items-center gap-2">

                            <FaCheckCircle className="w-5 h-5" />

                            <span>No Credit Card Required</span>

                        </div>

                        <div className="flex items-center gap-2">

                            <FaCheckCircle className="w-5 h-5" />

                            <span>Start in Under 60 Seconds</span>

                        </div>

                        <div className="flex items-center gap-2">

                            <FaCheckCircle className="w-5 h-5" />

                            <span>Cancel Anytime</span>

                        </div>

                    </div>

                </div>

            </div>
            
        </section>
    );
};

export default Solution;