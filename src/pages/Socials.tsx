import { MessageCircle, Instagram, Music, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import followMySocials from "@/assets/follow-my-socials.png";

// Force refresh - timestamp: 1727395080000
const Socials = () => {
  const socialLinks = [
    {
      id: "murphyr3ps",
      name: "TikTok",
      icon: Music,
      url: "https://tiktok.com/@murphyr3ps",
      color: "bg-black hover:bg-gray-800",
      description: "@murphyr3ps\nStreetwear, Finds, Life"
    },
    {
      id: "murphyfinds", 
      name: "TikTok",
      icon: Music,
      url: "https://tiktok.com/@murphyfinds",
      color: "bg-gray-900 hover:bg-gray-700",
      description: "@murphyfinds\nAll Finds, Rotations"
    },
    {
      id: "oldmoneymurphy",
      name: "TikTok",
      icon: Music,
      url: "https://tiktok.com/@oldmoneymurphy", 
      color: "bg-zinc-800 hover:bg-zinc-600",
      description: "@oldmoneymurphy\nOld Money, Grisch, Accessories"
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/murphyfinds",
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      description: "Behind-the-scenes & product photos"
    },
    {
      id: "discord",
      name: "Discord",
      icon: MessageCircle,
      url: "https://discord.gg/murphyfinds",
      color: "bg-indigo-500 hover:bg-indigo-600",
      description: "Join our community discussions"
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@murphyfinds",
      color: "bg-red-500 hover:bg-red-600",
      description: "Product unboxings & tutorials"
    }
  ];

  const handleSocialClick = (platform: string, url: string) => {
    console.log('Social click tracked:', platform);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 via-pink-300 via-pink-100 to-white" key="socials-refresh">
      <div className="container mx-auto px-4 py-0">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="-mb-8 -mt-6">
            <img 
              src={followMySocials} 
              alt="Follow My Socials" 
              className="mx-auto max-w-full h-auto"
            />
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-accent-foreground text-sm font-medium mt-8">
            🎯 Find all my socials to keep up to date
          </div>
        </div>

        {/* Social Links Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <div
                key={social.id}
                className="group relative bg-card/95 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-6 hover:shadow-medium transition-all duration-medium cursor-pointer flex flex-col h-full hover-lift"
                onClick={() => handleSocialClick(social.name, social.url)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-lg ${social.color} text-white group-hover:scale-110 transition-transform duration-medium`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-card-foreground">
                      {social.name}
                    </h3>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 flex-grow whitespace-pre-line">
                  {social.description}
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-2 border-primary/30 hover:gradient-hero hover:text-white hover:border-0 transition-all duration-500 ease-in-out hover-scale rounded-xl shadow-medium mt-auto"
                >
                  Follow on {social.name}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Socials;