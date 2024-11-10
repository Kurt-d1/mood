import './App.css';
import SocialMediaDashboard from './components/SocialMediaDashboard';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <SocialMediaDashboard isInternalUser={true} />
    </div>
  );
}

export default App;