import { ExternalLink } from "lucide-react";
import howToOrderTitle from "@/assets/how-to-order-title.png";

const Tutorial = () => {
  const videoId = "P-pcMBkujss";
  const videoUrl = "https://youtu.be/P-pcMBkujss?si=CBifSPOGTq-t8ogt";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handleVideoClick = () => {
    window.open(videoUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 via-pink-300 via-pink-100 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="-mb-10 -mt-6">
            <img 
              src={howToOrderTitle} 
              alt="How to Order" 
              className="mx-auto max-w-full h-auto"
            />
          </div>
          <p className="text-lg text-black -mt-4 mb-1">
            Your Complete Step By Step Guide On How To Order From iTaoBuy 🔮
          </p>
          
          <div 
            className="relative cursor-pointer group max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mt-12"
            onClick={handleVideoClick}
          >
            <img
              src={thumbnailUrl}
              alt="How to Order Tutorial Video"
              className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
              <div className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            
            {/* External Link Icon */}
            <div className="absolute top-4 right-4 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ExternalLink className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <p className="text-muted-foreground mt-6 text-lg">
            Click to watch the complete ordering tutorial
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;