// src/components/CheckboxCard.js
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import IconButton from "@mui/material/IconButton";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';


const ItemCard = ({ title, url, id, onAdd }) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [description, setDescription] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  const handleAdd = () => {
    setIsVisible(false);
    if (onAdd) {
      onAdd();
    }
  };

  const getSummary = async () => {
	try {
		const response = await fetch(
		  "https://autotourist.ue.r.appspot.com/api/crawl",
		  {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  articleID: {id}
			}),
		  }
		);
  
		if (response.ok) {
		  const data = await response.json();
		  setDescription(data);
		  console.log(data);
		} else {
		  console.error("Error:", response.statusText);
		}
	  } catch (err) {
		console.error(err);
	  }
		setIsLoading(false);
	  
  }
  useEffect(()=>{
	getSummary()
  }, [])

  return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.5 }}
					transition={{ duration: 0.5 }}
				>
					<Card
						variant="outlined"
						style={{ margin: "10px", borderRadius: "15px" }}
					>
						<CardContent>
							<Typography
								variant="h5"
								style={{
									fontFamily: "Poppins",
									fontWeight: 'bold',
								}}

							>
								{title}
							</Typography>
								{isLoading ? <CircularProgress /> : <Typography>{description}</Typography>}
							<Typography
								variant="body2"
								color="textSecondary"
								style={{
									fontFamily: "Inter",
                  fontSize:"1rem"
								}}
							>
								<a
									href={url}
									target="_blank"
									rel="noopener noreferrer"
								>
									{url}
								</a>
							</Typography>
							<IconButton color="primary" onClick={handleAdd}>
								<AddCircleOutlinedIcon />
							</IconButton>
						</CardContent>
					</Card>
				</motion.div>
			)}
		</AnimatePresence>
  );
};

export default ItemCard;
