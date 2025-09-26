import { MessageCircle, Instagram, Music, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

// Force refresh - timestamp: 1727395080000
const Socials = () => {
  const socialLinks = [
    {
      id: "murphyr3ps",
      name: "TikTok",
      icon: Music,
      url: "https://tiktok.com/@murphyr3ps",
      color: "bg-black hover:bg-gray-800",
      description: "@murphyr3ps"
    },
    {
      id: "murphyfinds", 
      name: "TikTok",
      icon: Music,
      url: "https://tiktok.com/@murphyfinds",
      color: "bg-gray-900 hover:bg-gray-700",
      description: "@murphyfinds"
    },
    {
      id: "oldmoneymurphy",
      name: "TikTok",
      icon: Music,
      url: "https://tiktok.com/@oldmoneymurphy", 
      color: "bg-zinc-800 hover:bg-zinc-600",
      description: "@oldmoneymurphy"
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
    <div className="min-h-screen bg-background" key="socials-refresh">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Follow Murphy Finds Everywhere
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Stay connected and never miss the latest product finds, reviews, and exclusive deals. 
            Join our community across all platforms!
          </p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-accent-foreground text-sm font-medium">
            🎯 Follow everywhere for the complete experience
          </div>
        </div>

        {/* Social Links Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <div
                key={social.id}
                className="group relative bg-card border border-table-border rounded-lg p-6 hover:shadow-medium transition-all duration-medium cursor-pointer flex flex-col h-full"
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
                
                <p className="text-muted-foreground mb-4 flex-grow">
                  {social.description}
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors duration-medium mt-auto"
                >
                  Follow on {social.name}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-12 p-8 bg-secondary rounded-lg">
          <h2 className="text-2xl font-semibold text-secondary-foreground mb-4">
            Don't Miss Out!
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Each platform offers unique content - from TikTok finds to detailed unboxings on YouTube. 
            Follow them all to get the complete Murphy Finds experience.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {socialLinks.slice(0, 3).map((social) => (
              <Button
                key={social.id}
                variant="outline"
                size="sm"
                onClick={() => handleSocialClick(social.name, social.url)}
              >
                {social.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Socials;