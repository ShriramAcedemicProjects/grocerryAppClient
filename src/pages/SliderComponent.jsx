import React from "react";
import Slider from "react-slick";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom arrow components
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        right: "20px",
        zIndex: 10,
        backgroundColor: "#ffffffcc",
        "&:hover": { backgroundColor: "#ffffff" },
        transform: "translateY(-50%)",
      }}
    >
      <ArrowForwardIos sx={{ color: "#4caf50" }} />
    </IconButton>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        left: "20px",
        zIndex: 10,
        backgroundColor: "#ffffffcc",
        "&:hover": { backgroundColor: "#ffffff" },
        transform: "translateY(-50%)",
      }}
    >
      <ArrowBackIos sx={{ color: "#4caf50" }} />
    </IconButton>
  );
};

const slides = [
  {
    img: "https://img.freepik.com/free-photo/top-view-reusable-bags-wooden-surface-with-vegetables-fruit_23-2148493513.jpg?w=996",
    text: "Fresh From The Farm",
    subtext: "Handpicked produce delivered with love.",
  },
  {
    img: "https://img.freepik.com/free-photo/front-view-bread-reusable-bag-with-bulk-pasta-nuts_23-2148493532.jpg?w=996",
    text: "Sustainable Living",
    subtext: "Eco-friendly bags & bulk grains for you.",
  },
  {
    img: "https://img.freepik.com/free-photo/front-view-immunity-boosting-foods-with-citrus-ginger_23-2149211501.jpg?w=996",
    text: "Boost Your Immunity",
    subtext: "Citrus, ginger & nature’s health pack.",
  },
];

const SliderComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <Box sx={{ bottom: 10 }}>
        <ul style={{ margin: 0, padding: 0, display: "flex", justifyContent: "center", gap: 10 }}>
          {dots}
        </ul>
      </Box>
    ),
    customPaging: () => (
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "#4caf50",
          opacity: 0.5,
        }}
      />
    ),
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        mt: 3,
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: 4,
      }}
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              height: isMobile ? "250px" : "450px",
              overflow: "hidden",
            }}
          >
            <img
              src={slide.img}
              alt={`Slide ${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                px: 4,
                pb: 6,
              }}
            >
              <Typography variant={isMobile ? "h6" : "h4"} sx={{ fontWeight: "bold" }}>
                {slide.text}
              </Typography>
              <Typography variant={isMobile ? "body2" : "h6"}>
                {slide.subtext}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default SliderComponent;
