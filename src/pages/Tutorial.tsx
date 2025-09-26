import { useState } from "react";
import { ChevronRight, ChevronLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Create Your Account",
      description: "Sign up for Taobao or 1688 with your email address. You'll need to verify your phone number for security.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      tips: ["Use a strong password", "Keep your login details safe", "Consider using a VPN if outside China"]
    },
    {
      title: "Navigate to the Product",
      description: "Click any 'View' button from our catalog to go directly to the product page on Taobao or 1688.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      tips: ["Our links take you directly to the product", "Check seller ratings before buying", "Read product reviews carefully"]
    },
    {
      title: "Select Your Options",
      description: "Choose size, color, quantity and any other product variations. Use translation tools if needed.",
      image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&h=400&fit=crop",
      tips: ["Google Translate works well for Chinese text", "Double-check sizes - they may differ from US sizing", "Contact seller if you have questions"]
    },
    {
      title: "Add to Cart & Checkout",
      description: "Add the item to your cart and proceed to checkout. You'll need to enter your shipping address.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      tips: ["Use a shipping forwarding service if needed", "Check shipping costs before finalizing", "Save your address for future orders"]
    },
    {
      title: "Payment & Shipping",
      description: "Complete your payment using Alipay, credit card, or other accepted methods. Track your package once shipped.",
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&h=400&fit=crop",
      tips: ["Keep track of your order number", "Shipping can take 1-3 weeks internationally", "Contact customer service if there are issues"]
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = tutorialSteps[currentStep];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How to Order from Taobao & 1688
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Follow our step-by-step guide to successfully purchase products from Chinese marketplaces. 
            It's easier than you think!
          </p>
          
          {/* Progress Indicator */}
          <div className="flex justify-center items-center space-x-2 mb-8">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-medium ${
                  index <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {tutorialSteps.length}
          </div>
        </div>

        {/* Current Step */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-table-border rounded-lg overflow-hidden shadow-soft">
            {/* Step Image */}
            <div className="aspect-video bg-muted">
              <img
                src={currentStepData.image}
                alt={currentStepData.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Step Content */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-4">
                {currentStepData.title}
              </h2>
              
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {currentStepData.description}
              </p>
              
              {/* Tips */}
              <div className="bg-secondary rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-secondary-foreground mb-3">
                  💡 Pro Tips:
                </h3>
                <ul className="space-y-2">
                  {currentStepData.tips.map((tip, index) => (
                    <li key={index} className="text-muted-foreground flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Navigation */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                
                {currentStep < tutorialSteps.length - 1 ? (
                  <Button onClick={nextStep}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Link to="/">
                    <Button>
                      Start Browsing Catalog
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <div className="bg-accent rounded-lg p-6">
            <h3 className="text-lg font-semibold text-accent-foreground mb-3">
              Need More Help?
            </h3>
            <p className="text-accent-foreground mb-4">
              Join our community for personalized assistance and tips from experienced buyers.
            </p>
            <div className="flex justify-center gap-3">
              <Link to="/socials">
                <Button variant="outline">
                  Join Discord Community
                </Button>
              </Link>
              <Link to="/">
                <Button>
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;