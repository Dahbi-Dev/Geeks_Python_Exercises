
export default function Contact() {
    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-12 px-4">
                <h2 className="text-3xl font-semibold mb-6 text-center">Contact Us</h2>
                <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="text-left">
                        Contact us and we will get back to you within 24 hours.
                        <p>
                            <i class="fa-solid fa-location-dot me-3"></i>
                            Company Name
                        </p>
                        <p>
                            <i class="fa-solid fa-phone me-3"></i>
                            +256 778 800 900
                        </p>
                        <p>
                            <i class="fa-solid fa-envelope me-3"></i>
                            company.gmail.com
                        </p>
                    </div>
                    <form className="bg-white p-6 rounded shadow-md">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                            <input type="text" id="name" className="w-full px-3 py-2 border rounded" placeholder="Your Name" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input type="email" id="email" className="w-full px-3 py-2 border rounded" placeholder="Your Email" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
                            <textarea id="message" className="w-full px-3 py-2 border rounded" rows="5" placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
