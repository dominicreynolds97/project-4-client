import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'
import TrackIndex from './components/artists/TrackIndex'
import TrackCreate from './components/artists/TrackCreate'
import ArtistIndex from './components/artists/ArtistIndex'
import ArtistShow from './components/artists/ArtistShow'
import LiveMusic from './components/liveMusic/LiveMusic'
import GigIndex from './components/liveMusic/GigIndex'
import LogIn from './components/account/LogIn'
import Register from './components/account/Register'
import Account from './components/account/Account'
import ReleaseShow from './components/artists/ReleaseShow'
import Releaseindex from './components/artists/ReleaseIndex'

function App() {
  return (
    <Router>
      <Nav/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/tracks/create' component={TrackCreate}/>
        <Route path='/tracks' component={TrackIndex}/>
        <Route path='/releases/:id' component={ReleaseShow}/>
        <Route path='/releases' component={Releaseindex}/>
        <Route path='/artists/:id' component={ArtistShow}/>
        <Route path='/artists' component={ArtistIndex}/>
        <Route path='/live-music/gigs' component={GigIndex}/>
        <Route path='/live-music' component={LiveMusic}/>
        <Route path='/login' component={LogIn}/>
        <Route path='/register' component={Register}/>
        <Route path='/account' component={Account}/>
      </Switch>
    </Router>
  )
}

export default App
