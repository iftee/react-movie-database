import React from 'react';
import Columns from 'react-bulma-components/lib/components/columns';
import './ThumbnailGrid.scss';

const ThumbnailGrid = ({ children, header, preHeader, loading }) => {
  const renderElements = () => {
    const gridElements = children.map((element, iterator) => {
      return(
        <Columns.Column mobile={{ size: 6 }} tablet={{ size: 4 }} desktop={{ size: 3 }} key={iterator}>
          {element}
        </Columns.Column>
      )
    })
    return gridElements;
  }

  return(
    <div className="movie-thumbnail-grid-wrap">
      {header && !loading ?
        <>
          {header === 'Cast' ?
            <h3 className="movie-thumbnail-grid-title">Cast</h3>
            :
            <h1 className="movie-thumbnail-grid-title">
              {preHeader ?
                <span className="movie-thumbnail-grid-title-pre">{preHeader}</span>
                :
                null
              }
              {header}
            </h1>
          }
        </>
        :
        null
      }
      <Columns className="is-flex-mobile movie-thumbnail-grid">
        {renderElements()}      
      </Columns>
    </div>
  )
}

export default ThumbnailGrid;