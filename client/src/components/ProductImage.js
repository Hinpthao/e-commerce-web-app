import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

const ProductImage = ({ detail }) => {
    const [Images, setImages] = useState([]);

    useEffect(() => {
        if(detail.productImages && detail.productImages.length > 0){
            let images = [];

            detail.productImages && detail.productImages.map(item => {
                images.push({
                    original: `/uploads/${item}`,
                    thumbnail: `/uploads/${item}`
                })
            })
            setImages(images)
        }
    }, [detail])

    return (
        <div>
            <ImageGallery items={Images} autoPlay="true" />
        </div>
    );
};

export default ProductImage;