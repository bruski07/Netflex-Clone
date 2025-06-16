import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mediaDetailedList from '@assets/data/mediaDetailedList.json';
import MediaInfo from "@/components/MediaDetails/MediaInfo";
import { useVideoPlayer, VideoView } from "expo-video";
import MediaHeader from "@/components/MediaDetails/MediaHeader";
import { useEffect, useRef, useState } from "react";
import SeasonSelector from "@/components/MediaDetails/SeasonSelector";
import { Episode } from "@/types/types";
import EpisodeListItem from "@/components/EpisodeListItem";

export default function MediaDetails() {
  const { id } = useLocalSearchParams();
  const [selectedSeason, setSelectedSeason] = useState<string>("Season 1");
  const [seasonEpisodes, setSeasonEpisodes] = useState<Episode[]>([]);
  const [episodeLoadingId, setEpisodeLoadingId] = useState<string | null>(null);

  const videoViewRef = useRef<VideoView | null>(null);

  const mediaItem = mediaDetailedList.find((media) => media.id === id);

  useEffect(() => {
    if (!mediaItem || mediaItem.type !== 'TV_SERIES') return;

    const season = mediaItem.seasons?.find((seasonItem) => seasonItem.seasonName === selectedSeason);

    setSeasonEpisodes(season?.episodes || []);
  }, [selectedSeason])

  if (!mediaItem) {
    return <Text style={{ color: 'white' }}>Media Item Was Not Found!</Text>;
  };

  const { title, releaseYear, ageRestriction, duration, description, type, seasons, trailer, videoUrl, thumbnail } = mediaItem;

  const videoSource = type === 'MOVIE' ? videoUrl : seasons?.[0].episodes?.[0].videoUrl

  if (!videoSource) {
    return <Text style={{ color: 'white' }}>Video Source Was Not Found!</Text>;
  };

  const trailerPlayer = useVideoPlayer(trailer, player => {
    player.currentTime = 10;
    player.play();
  })

  const mediaPlayer = useVideoPlayer(videoSource, player => {
    player.showNowPlayingNotification = true;
  })

  const onPlayMediaPressed = async (video?: string, episodeId?: string) => {
    trailerPlayer.pause();
    if (video && episodeId) {
      setEpisodeLoadingId(episodeId);
      await mediaPlayer.replaceAsync(video);
      setEpisodeLoadingId(null);
    }
    videoViewRef.current?.enterFullscreen();
    mediaPlayer.play();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MediaHeader
        thumbnail={thumbnail}
        trailerPlayer={trailerPlayer}
        mediaPlayer={mediaPlayer}
        videoViewRef={videoViewRef}
      />
      <FlatList
        data={seasonEpisodes}
        renderItem={({ item }) =>
          <EpisodeListItem
            episode={item}
            onPlayMediaPressed={onPlayMediaPressed}
            isEpisodeLoading={episodeLoadingId === item.id}
          />
        }
        ListHeaderComponent={
          <View style={{ padding: 10, gap: 5 }}>
            <MediaInfo
              title={title}
              releaseYear={releaseYear}
              ageRestriction={ageRestriction}
              duration={duration}
              description={description}
              type={type}
              nrOfSeasons={seasons?.length}
              onPlayMediaPressed={onPlayMediaPressed}
            />
            {(type === 'TV_SERIES' && !!seasons) && (
              <SeasonSelector
                seasons={seasons}
                selectedSeason={selectedSeason}
                setSelectedSeason={setSelectedSeason}
              />
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
};