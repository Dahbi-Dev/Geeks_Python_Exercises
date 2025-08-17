import { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import japan from './assets/japan.webp';
import macao from './assets/macao.webp';
import lasVegas from './assets/las-vegas.webp';
import honkKong from './assets/honk-kong.jpg';

const items = [
    { src: honkKong, Legend: "Honk Kong" },
    { src: macao, Legend: "Macao" },
    { src: japan, Legend: "Japan" },
    { src: lasVegas, Legend: "Las Vegas" },
]

export default class DemoCarousel extends Component {
    render() {
        return (
            <Carousel>
                {items.map((item, index) => (
                    <div key={index}>
                        <img src={item.src} alt={item.Legend} />
                        <p className="legend">{item.Legend}</p>
                    </div>
                ))}
            </Carousel>
        );
    }
};
