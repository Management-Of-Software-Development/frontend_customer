import styled from "styled-components";

const Container = styled.div`
	margin-top: 40px;
	position: relative;
	display: flex;
	font-size: 14px;
	font-weight: 500;
	overflow: hidden;
`;

const Img = styled.img`
	width: 100%;
	height: auto;

	@media all and (max-width: 480px) {
		height: 400px;
		width: 1100px;
		transform: translateX(-200px);
      }
`;

const Content = styled.div`
	position: absolute;
	width: 360px;
	background-color: white;
	left: 30px;
	bottom: 30px;
	box-sizing: border-box;
	padding: 2.5%;
	
	@media (max-width: 480px) {
        width: 80%;
		height: auto;
		left: 0;
  		right: 0;
		bottom: 20px;
		margin: 0 auto;
      }
`;

const Text = styled.p`
	font-size: 14px;
	color: #707070;
	letter-spacing: 0.15em;
	line-height: 24px;
`;

const Aroma = () => {
	return (
		<Container>
			<Img
				src="../assets/images/aroma/h1-parallax-img-1.jpg"
				alt="fail"
			/>
			<Content>
				<Text>
					“Do not give them a candle to light the way, teach them how
					to make fire instead. That is the meaning of enlightenment.”
				</Text>
			</Content>
		</Container>
	);
};

export default Aroma;
