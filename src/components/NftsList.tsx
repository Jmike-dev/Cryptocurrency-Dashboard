import { useEffect, useState } from "react";
import { useNFTsStore } from "../store/nfts.store";
import type { NFT } from "../services/nfts.service";

// Random placeholder images
const placeholderImages = [
  "https://picsum.photos/400/400?random=1",
  "https://picsum.photos/400/400?random=2",
  "https://picsum.photos/400/400?random=3",
  "https://picsum.photos/400/400?random=4",
  "https://picsum.photos/400/400?random=5",
];

function NftsList() {
  const { allNfts, loading, fetchNFTs, error } = useNFTsStore();
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  useEffect(() => {
    const loadingStates: Record<string, boolean> = {};
    allNfts.forEach((nft) => {
      loadingStates[nft.token_id] = true;
    });
    setImageLoading(loadingStates);
  }, [allNfts]);

  const handleImageLoad = (tokenId: string) => {
    setImageLoading((prev) => ({ ...prev, [tokenId]: false }));
  };

  const renderSkeleton = () => (
    <div className="bg-gray-800 rounded-2xl animate-pulse h-64 flex flex-col shadow-lg overflow-hidden">
      <div className="h-48 w-full bg-gray-700 mb-4 rounded-t-2xl" />
      <div className="px-4 flex-1 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-700 rounded w-1/2" />
        <div className="h-3 bg-gray-700 rounded w-full" />
      </div>
    </div>
  );

  if (loading)
    return (
      <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>{renderSkeleton()}</div>
        ))}
      </section>
    );

  if (error)
    return <p className="text-center text-red-400 text-lg mt-8">{error}</p>;

  if (!allNfts.length)
    return <p className="text-center text-gray-400 text-lg mt-8">No NFTs found.</p>;

  return (
    <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {allNfts.map((nft, i) => {
        const imgSrc =
          nft.metadata
            ? (() => {
                try {
                  const meta = JSON.parse(nft.metadata);
                  return meta.image || placeholderImages[i % placeholderImages.length];
                } catch {
                  return placeholderImages[i % placeholderImages.length];
                }
              })()
            : placeholderImages[i % placeholderImages.length];

        return (
          <div
            key={nft.token_id}
            className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-3xl border border-gray-700"
          >
            <div className="h-48 w-full relative bg-gray-800 flex items-center justify-center overflow-hidden">
              <img
                src={imgSrc}
                alt={nft.name}
                onLoad={() => handleImageLoad(nft.token_id)}
                className={`h-full w-full object-cover transition-opacity duration-500 ${
                  imageLoading[nft.token_id] ? "opacity-0" : "opacity-100"
                }`}
              />
              {imageLoading[nft.token_id] && (
                <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-t-2xl" />
              )}
            </div>

            <div className="p-4 flex flex-col justify-between h-44">
              <div>
                <h3 className="font-bold text-lg mb-1 truncate">{nft.name}</h3>
                <p className="text-gray-400 text-sm mb-1">Token ID: {nft.token_id}</p>
                <p className="text-gray-400 text-xs break-all truncate">
                  Owner: {nft.owner_of}
                </p>
              </div>
              {nft.token_uri && (
                <a
                  href={nft.token_uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-center bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold py-1 px-3 rounded-lg transition-all duration-200 truncate"
                >
                  View Token URI
                </a>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default NftsList;
