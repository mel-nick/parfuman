import React from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
        "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Slide_1 from './../../images/img-slider/9.jpg';
import Slide_2 from './../../images/img-slider/2.jpg';
import Slide_3 from './../../images/img-slider/7.jpg';
import Slide_4 from './../../images/img-slider/4.jpg';
import Slide_5 from './../../images/img-slider/10.jpg';
import Slide_6 from './../../images/img-slider/8.jpg';

const Slider = () => {
    return (
        <MDBContainer fluid className="p-0">
            <MDBCarousel
                activeItem={1}
                length={6}
                showControls={true}
                showIndicators={true}
                className="z-depth-1 mt-3"
            >
                <MDBCarouselInner>
                    <MDBCarouselItem itemId="1">
                        <MDBView>
                            <img
                                className="d-block w-100"
                                src={Slide_1}
                                alt="First slide"
                            />
                            <MDBMask overlay="black-light" />
                        </MDBView>
                        <MDBCarouselCaption>
                            <h3 className="h3-responsive">Будь желанным. Будь собой.</h3>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="2">
                        <MDBView>
                            <img
                                className="d-block w-100"
                                src={Slide_2}
                                alt="Second slide"
                            />
                            <MDBMask overlay="black-light" />
                        </MDBView>
                        <MDBCarouselCaption>
                            <h3 className="h3-responsive">Ворвись в свой день.</h3>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="3">
                        <MDBView>
                            <img
                                className="d-block w-100"
                                src={Slide_4}
                                alt="First slide"
                            />
                            <MDBMask overlay="black-light" />
                        </MDBView>
                        <MDBCarouselCaption>
                            <h3 className="h3-responsive">Для зверя, который таится в Вас.</h3>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="4">
                        <MDBView>
                            <img
                                className="d-block w-100"
                                src={Slide_5}
                                alt="First slide"
                            />
                            <MDBMask overlay="black-light" />
                        </MDBView>
                        <MDBCarouselCaption>
                            <h3 className="h3-responsive">Это только аромат. Остальное – в твоих руках</h3>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="5">
                        <MDBView>
                            <img
                                className="d-block w-100"
                                src={Slide_6}
                                alt="First slide"
                            />
                            <MDBMask overlay="black-light" />
                        </MDBView>
                        <MDBCarouselCaption>
                            <h3 className="h3-responsive">Сопротивление бесполезно.</h3>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="6">
                        <MDBView>
                            <img
                                className="d-block w-100"
                                src={Slide_3}
                                alt="First slide"
                            />
                            <MDBMask overlay="black-light" />
                        </MDBView>
                        <MDBCarouselCaption>
                            <h3 className="h3-responsive">Все оттенки твоих желаний</h3>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>
                </MDBCarouselInner>
            </MDBCarousel>
        </MDBContainer>
    );
}

export default Slider;