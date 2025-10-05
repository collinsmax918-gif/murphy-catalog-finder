import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { processProductsFromFile, bulkInsertProducts } from '@/utils/bulkProductLoader';

const BulkUpload = () => {
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');

  const handleUpload = async () => {
    if (!fileContent.trim()) {
      toast.error('Please paste the product data');
      return;
    }

    setLoading(true);
    setProgress('Parsing products...');

    try {
      const products = await processProductsFromFile(fileContent);
      setProgress(`Parsed ${products.length} products. Inserting into database...`);
      
      await bulkInsertProducts(products);
      
      toast.success(`Successfully added ${products.length} products!`);
      setFileContent('');
      setProgress('');
    } catch (error) {
      console.error('Error uploading products:', error);
      toast.error('Failed to upload products. Check console for details.');
      setProgress('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Bulk Product Upload</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Paste Product Data
          </label>
          <Textarea
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
            placeholder="Paste product lines here in format: (Product Name)[image_url]{product_url}-$price-"
            className="min-h-[400px] font-mono text-sm"
            disabled={loading}
          />
        </div>

        {progress && (
          <div className="p-4 bg-blue-50 text-blue-700 rounded">
            {progress}
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={loading}
          size="lg"
          className="w-full"
        >
          {loading ? 'Processing...' : 'Upload Products'}
        </Button>
      </div>
    </div>
  );
};

export default BulkUpload;
