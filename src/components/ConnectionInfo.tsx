
interface ConnectionInfoProps {
  edgeFunctionUrl: string;
  clientId: string;
}

const ConnectionInfo = ({ edgeFunctionUrl, clientId }: ConnectionInfoProps) => {
  return (
    <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg mb-6">
      <p className="text-blue-800 text-sm">
        <strong>URL da função Edge:</strong> {edgeFunctionUrl}
      </p>
      <p className="text-blue-800 text-sm mt-1">
        <strong>Client ID:</strong> {clientId.substring(0, 12)}...
      </p>
    </div>
  );
};

export default ConnectionInfo;
