interface PodcastDetailsProps {
  params: {
    podcastId: string;
  };
}

const PodcastDetails = ({ params }: PodcastDetailsProps) => {
  return (
    <div>
      <p className="text-white-1">Podcast details for {params.podcastId}</p>
    </div>
  );
};

export default PodcastDetails;
