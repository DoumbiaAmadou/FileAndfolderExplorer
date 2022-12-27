import { IconFolder, IconFile, IconFolderOpen } from './Icons.js'

export const FilesViewer = ({ files, onBack, onOpen }) =>(<table className="table">
    <tbody>
      <tr className="clikable" onClick={() => onBack()}>
        <td className='icon-row'><IconFolderOpen /></td>
        <td>...</td>
        <td></td>
      </tr>
      {files?.map(({ name, directory, size }, index) => {
        return (
          <tr key={index} className="clikable" onClick={() => directory && onOpen(name)}>
            <td className='icon-row'>{directory ? <IconFolder /> : <IconFile />}</td>
            <td>{name}</td>
            <td><span className="float-end">{size}</span></td>
          </tr>
        )
      })}
    </tbody>
  </table>)
