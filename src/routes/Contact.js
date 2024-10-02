import React, { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { useSpring, animated, config } from "react-spring";
import { useFirstVisit } from "../Utils";

const Contact = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [submitStatus, setSubmitStatus] = useState(null);

	const isFirstVisit = useFirstVisit();

	const handleSubmit = async (e) => {
		console.log("submitting");

		e.preventDefault();
		setIsLoading(true);
		const data = new FormData();
		data.append("name", name);
		data.append("email", email);
		data.append("message", message);
		data.append("sheetName", "Personal");

		try {
			const response = await fetch(
				"https://script.google.com/macros/s/AKfycbzUnCt-XonKsqeYtquXUtLduIdKkmxm01ZBKwuh9K2KyJ6MH-96rTpFC4kMy5jEVvaI/exec",
				{
					method: "POST",
					body: data,
				}
			);
			if (response.ok) {
				setSubmitStatus("success");
				setName("");
				setEmail("");
				setMessage("");
			} else {
				setSubmitStatus("error");
			}
		} catch (error) {
			console.error("Error:", error);
			setSubmitStatus("error");
		}
		setIsLoading(false);
	};

	const taglineAnimation = useSpring({
		opacity: 1,
		from: isFirstVisit ? { opacity: 0 } : {},
		config: config.molasses,
		delay: isFirstVisit ? 900 : 0,
	});

	const contactFormAnimation = useSpring({
		opacity: 1,
		transform: "translateY(0)",
		from: { opacity: 0, transform: "translateY(50px)" },
		config: config.gentle,
		delay: isFirstVisit ? 1200 : 0,
	});

	const loadingAnimation = useSpring({
		to: async (next) => {
			while (isLoading) {
				await next({ transform: "rotate(0deg)" });
				await next({ transform: "rotate(360deg)" });
			}
		},
		from: { transform: "rotate(0deg)" },
		config: { duration: 1000 },
	});

	const statusAnimation = useSpring({
		opacity: submitStatus ? 1 : 0,
		transform: submitStatus ? "translateY(0)" : "translateY(-20px)",
		config: config.gentle,
	});
	return (
		<div className=" bg-gray-900 text-gray-100 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<animated.p
					style={taglineAnimation}
					className="text-2xl text-center text-gray-300 mb-14 font-light"
				>
					<span className="">
						Get in touch with me! I'm looking for collaborators and investors!
						Or if you just want to say hi, feel free to drop me a message.
					</span>
				</animated.p>

				{/* New section for booking a meeting */}
				<animated.div style={contactFormAnimation} className="mb-12">
					<h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
						Book a Meeting
					</h2>
					<p className="text-center text-gray-300 mb-6">
						Want to discuss something in person? Schedule a meeting with me!
					</p>
					<div className="text-center">
						<a
							href="https://calendly.com/rahel-gunaratne"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-600 rounded-md hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
						>
							Schedule a Meeting
						</a>
					</div>
				</animated.div>

				<animated.div style={contactFormAnimation}>
					<h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-12 mt-24">
						Email Me
					</h1>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-300"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
							/>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-300"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
							/>
						</div>
						<div>
							<label
								htmlFor="message"
								className="block text-sm font-medium text-gray-300"
							>
								Message
							</label>
							<textarea
								id="message"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								required
								rows="4"
								className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
							></textarea>
						</div>
						<div>
							<button
								type="submit"
								className={`w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-600 rounded-md 
									${isLoading
										? "opacity-50 cursor-not-allowed"
										: "hover:from-purple-600 hover:to-pink-700"
									}
									 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
								disabled={isLoading}
							>
								{isLoading ? (
									<animated.span
										style={loadingAnimation}
										className="inline-block"
									>
										⟳
									</animated.span>
								) : (
									"Send Message"
								)}
							</button>
						</div>
					</form>
					<animated.div style={statusAnimation} className="mt-4 text-center">
						{submitStatus === "success" && (
							<p className="text-green-400">Message sent successfully!</p>
						)}
						{submitStatus === "error" && (
							<p className="text-red-400">
								Error sending message. Please try again.
							</p>
						)}
					</animated.div>
				</animated.div>
			</div>
		</div>
	);
};

export default Contact;
