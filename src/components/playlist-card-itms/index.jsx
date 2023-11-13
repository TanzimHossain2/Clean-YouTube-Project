import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import PropsType from "prop-types";

const PlayListCard = ({ playlistThumbnails, playlistTitle, channelTitle }) => {
  const style = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: 1,
  };

  return (
    <Card sx={style}>
      <CardMedia
        component="img"
        image={playlistThumbnails.url}
        alt={playlistTitle}
      />
      <CardContent>
        <Typography variant="h6" color="text.primary">
          {`${
            playlistTitle.length > 50
              ? playlistTitle.substr(0, 50) + "..."
              : playlistTitle
          }`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {channelTitle}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions disableSpacing>
        <Button>
          <Stack spacing={1} direction={"row"} alignItems={"center"}>
            <PlayArrow />
            <Typography variant="body2" fontWeight={600}>
              START TUTORIAL
            </Typography>
          </Stack>
        </Button>
      </CardActions>
    </Card>
  );
};

PlayListCard.propTypes = {
  playlistThumbnails: PropsType.shape({
    url: PropsType.string,
  }),
  playlistTitle: PropsType.string,
  channelTitle: PropsType.string,
};

export default PlayListCard;
