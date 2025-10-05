import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { insertFirst100 } from '@/utils/insertFirst100';

const ProcessProducts = () => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState<string>('');
  const [results, setResults] = useState<any>(null);

  const handleProcess = async () => {
    setProcessing(true);
    setProgress('Starting bulk product upload...');
    setResults(null);

    try {
      const result = await insertFirst100();
      setResults(result);
      
      if (result.errors === 0) {
        toast.success(`Successfully added ${result.inserted} products!`);
        setProgress('✅ All products uploaded successfully!');
      } else {
        toast.warning(`Uploaded ${result.inserted} products with ${result.errors} errors`);
        setProgress(`⚠️ Completed with some errors`);
      }
    } catch (error) {
      console.error('Fatal error:', error);
      toast.error('Failed to process products');
      setProgress('❌ Failed to process products');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Product Upload</CardTitle>
          <CardDescription>
            Process and upload all products from murphy_items_bulk.txt
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              This will process approximately 1,100+ products from the uploaded file
              and add them to your catalog with proper categories, brands, and image links.
            </p>
          </div>

          {progress && (
            <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm">
              {progress}
            </div>
          )}

          {results && (
            <div className="space-y-2 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-semibold text-green-900">Results:</p>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Total lines: {results.total}</li>
                <li>• Parsed: {results.parsed}</li>
                <li>• Successfully inserted: {results.inserted}</li>
                <li>• Skipped: {results.skipped}</li>
                <li>• Errors: {results.errors}</li>
              </ul>
            </div>
          )}

          <Button
            onClick={handleProcess}
            disabled={processing}
            size="lg"
            className="w-full"
          >
            {processing ? 'Processing...' : 'Start Upload'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessProducts;
