import { useState, useMemo } from 'react';
import { FilesViewer } from './Fileviewer.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const fs = window.require('fs')
const pathModule = window.require('path')
const { app } = window.require('@electron/remote');

const formatSize = size => {
  let i = Math.floor(Math.log(size) / Math.log(1024))
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
  )
}
function App() {
  const [path, setPath] = useState(app.getAppPath())
  const [searchString, setSearchString] = useState('');
  const files = useMemo(() => fs
    .readdirSync(path)
    .map(file => {
      const stats = fs.statSync(pathModule.join(path, file));
      return {
        name: file,
        size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
        directory: stats.isDirectory()
      }
    })
    .sort((a, b) => {
      if (a.directory === b.directory)
        return a.name.localeCompare(b.name)
      return a.directory ? -1 : 1
    }), [path])
  const filteredFiles = files.filter(s => s.name.startsWith(searchString))
  console.log(filteredFiles.length)

  const onBack = () => setPath(pathModule.dirname(path))
  const onOpen = folder => setPath(pathModule.join(path, folder))
  return (
    <>
      <div className="App">
        <h1>Folder APP cscs</h1>
        <div className="container mt-2">
          <h4>{path}</h4>
          <div className="form-group mt-4 mb-2">
            <input
              value={searchString}
              onChange={event => setSearchString(event.target.value)}
              className="form-control"
              placeholder='File search'
            />
          </div>
          <FilesViewer files={filteredFiles} onBack={onBack} onOpen={onOpen} />
        </div>
      </div>
    </>
  );
}

export default App;
