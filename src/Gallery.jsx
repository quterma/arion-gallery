import React, { useState, useRef, useCallback } from 'react';
import Card from './Card';
import useImagesListLoad from './useImagesListLoad';
import ImageList from '@mui/material/ImageList';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Gallery({ isReload }) {
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.down('sm'));
	const isMd = useMediaQuery(theme.breakpoints.down('md'));
	const isLg = useMediaQuery(theme.breakpoints.down('lg'));
	const cols = isSm ? 1 : isMd ? 2 : isLg ? 3 : 4;
	const gap = isSm ? 4 : isMd ? 6 : isLg ? 8 : 10;
	const pad = isSm ? 0 : isMd ? 2 : isLg ? 4 : 6;
	const width = isSm ? 300 : isMd ? 350 : isLg ? 400 : 450;
	const height = isSm ? 350 : isMd ? 400 : isLg ? 450 : 500;

	const [limit, setLimit] = useState(10);
	const [pageNumber, setPageNumber] = useState(1);

	const { imagesList, hasMore, loading, error } = useImagesListLoad(pageNumber, limit, isReload);

	const observer = useRef();
	let localRef = useRef(null);
	const lastImageRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	return (
		<Box sx={{ maxWidth: 1800, paddingLeft: pad, paddingRight: pad }}>
			<ImageList cols={cols} gap={gap}>
				{imagesList.map((imageData, index) => {
					if (imagesList.length === index + 1) localRef = lastImageRef;

					return (
						<Card
							key={imageData.id}
							ref={localRef}
							imageData={imageData}
							width={width}
							height={height}
						/>
					);
				})}
			</ImageList>
			{loading && <Skeleton animation="wave" />}
			{error && <Alert severity="error">Image List Loading Error!</Alert>}
		</Box>
	);
}
