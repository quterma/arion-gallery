import React, { forwardRef, useRef } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const Card = forwardRef(({ imageData, width = 200, height = 250 }, ref) => {
	const localRef = useRef(null);
	const inputRef = ref || localRef;

	return (
		<ImageListItem ref={inputRef}>
			<img
				src={`https://picsum.photos/id/${imageData.id}/${width}/${height}`}
				alt={imageData.author}
				loading="lazy"
			/>
			<ImageListItemBar title={`Author: ${imageData.author}`} />
		</ImageListItem>
	);
});

export default Card;
