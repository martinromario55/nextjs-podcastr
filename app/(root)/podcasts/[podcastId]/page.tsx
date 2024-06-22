"use client";

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import PodcastDetailPlayer from "@/components/PodcastDetailPlayer";
import { podcastData } from "@/constants/data";
import { Podcast } from "@/types";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function getPodcastById(
  podcastData: Podcast[],
  id: string,
): Podcast | undefined {
  return podcastData.find((podcast) => podcast._id === id);
}

function getOtherPodcasts(
  podcastData: Podcast[],
  currentPodcastId: string,
): Podcast[] {
  return podcastData.filter((podcast) => podcast._id !== currentPodcastId);
}

const PodcastDetails = ({
  params: { podcastId },
}: {
  params: { podcastId: string };
}) => {
  const { user } = useUser();

  // const podcast = useQuery(api.podcasts.getPodcastById, { podcastId });
  const podcast = getPodcastById(podcastData, podcastId);

  // const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, {
  //   podcastId,
  // });

  const similarPodcasts = getOtherPodcasts(podcastData, podcastId);

  // const isOwner = user?.id === podcast?.authorId;

  if (!similarPodcasts || !podcast) return <LoaderSpinner />;

  return (
    <section className="flex w-full flex-col">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Currenty Playing</h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphone"
          />
          <h2 className="text-16 font-bold text-white-1">25</h2>
        </figure>
      </header>

      <PodcastDetailPlayer {...podcast} />

      <p className="text-16 pb-8 pt-[45px] font-medium text-white-2 max-md:text-center">
        t is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using Content here, content here, making it look
        like readable English. Many desktop publishing packages and web page
        editors now use Lorem Ipsum as their default model text, and a search
        for lorem ipsum will uncover many web sites still in their infancy.
        Various versions have evolved over the years, sometimes by accident,
        sometimes on purpose (injected humour and the like).
      </p>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Transcription</h1>
          <p className="text-16 font-medium text-white-2">
            Podcast voice prompt
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Thumbnail Prompt</h1>
          <p className="text-16 font-medium text-white-2">Image prompt</p>
        </div>
      </div>
      <section className="mt-8 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Similar Podcasts</h1>

        {similarPodcasts && similarPodcasts.length > 0 ? (
          <div className="podcast_grid">
            {similarPodcasts?.map(
              ({ _id, podcastTitle, podcastDescription, imageUrl }) => (
                <PodcastCard
                  key={_id}
                  imageUrl={imageUrl as string}
                  title={podcastTitle}
                  description={podcastDescription}
                  podcastId={_id}
                />
              ),
            )}
          </div>
        ) : (
          <>
            <EmptyState
              title="No similar podcasts found"
              buttonLink="/discover"
              buttonText="Discover more podcasts"
            />
          </>
        )}
      </section>
    </section>
  );
};

export default PodcastDetails;
