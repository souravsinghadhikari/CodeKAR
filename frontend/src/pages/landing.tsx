import React from 'react';
import { Code2, Users, Trophy, Brain, ChevronRight, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-neutral-50 pt-16">
            {/* Hero Section */}
            <div className="bg-neutral-900 text-neutral-50">
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-bold mb-6">Master Your Coding Journey</h1>
                        <p className="text-xl text-neutral-300 mb-8">
                            Practice coding problems, ace technical interviews, and join our growing community of developers.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button onClick={() => {
                                navigate('/login')
                            }} className="bg-neutral-50 text-neutral-900 px-6 py-3 rounded-lg font-semibold hover:bg-neutral-200 transition flex items-center">
                                Start Practicing <ChevronRight className="ml-2" />
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-16 bg-neutral-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-neutral-900 mb-2">100+</div>
                            <div className="text-neutral-600">Coding Problems</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-neutral-900 mb-2">10+</div>
                            <div className="text-neutral-600">Programming Languages</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-neutral-900 mb-2">Free</div>
                            <div className="text-neutral-600">Early Access</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rest of the components remain the same */}
            <div className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={<Code2 className="w-8 h-8" />}
                            title="Diverse Problems"
                            description="From easy to hard, covering all major coding concepts and patterns"
                        />
                        <FeatureCard
                            icon={<Terminal className="w-8 h-8" />}
                            title="Interactive Coding"
                            description="Write and test your code in our feature-rich online IDE"
                        />
                        <FeatureCard
                            icon={<Users className="w-8 h-8" />}
                            title="Growing Community"
                            description="Be part of our early community and help shape our platform"
                        />
                        <FeatureCard
                            icon={<Brain className="w-8 h-8" />}
                            title="Learning Tracks"
                            description="Structured paths to master algorithms and data structures"
                        />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-neutral-900 text-neutral-50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-2xl mx-auto">
                        <Trophy className="w-16 h-16 mx-auto mb-6 text-neutral-300" />
                        <h2 className="text-3xl font-bold mb-4">Be Among Our First Users</h2>
                        <p className="text-neutral-300 mb-8">
                            Join now and get early access to all premium features for free.
                        </p>
                        <button onClick={() => {
                            navigate('/register')
                        }} className="bg-neutral-50 text-neutral-900 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-200 transition">
                            Create Free Account
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-neutral-800 text-neutral-400 py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>© 2026 Codekar. All rights not reserved 😉.</p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <div className="text-neutral-700 mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">{title}</h3>
            <p className="text-neutral-600">{description}</p>
        </div>
    );
}

