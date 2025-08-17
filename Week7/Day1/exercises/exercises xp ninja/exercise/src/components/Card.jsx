
export default function Card({ title, icon }) {
    return (
        <div className="container grid grid-cols-1 lg:grid-cols-[1fr_7fr] gap-7 py-9 odd:bg-gray-100">
            <i class={`text-9xl fa-solid ${icon} text-primary text-left lg:text-center mb-4 lg:mb-0 mx-auto lg:mx-0`}></i>
            <div className="text-left">
                <h2 className="text-3xl font-semibold mb-2">{title}</h2>
                <p className="text-justify">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla ratione deleniti quae, doloremque suscipit accusamus itaque veritatis dolor! Voluptatum, veritatis eos iure iusto rem fuga quas nesciunt repudiandae aliquid dolore.
                    Minus veritatis possimus facere maiores obcaecati distinctio aut iure delectus, suscipit earum inventore. Optio assumenda aliquam quaerat. Natus nobis voluptates quis. Aliquam eaque esse odit possimus, consequuntur perspiciatis laboriosam sapiente.
                </p>
            </div>
        </div>
    )
}
