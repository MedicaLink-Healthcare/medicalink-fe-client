import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';

const ExpandableContent = ({
  htmlContent,
  maxHeight = 300,
  className = '',
  expandText = 'Read More',
  collapseText = 'Show Less'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > maxHeight);
    }
  }, [htmlContent, maxHeight]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className={`relative transition-all duration-500 overflow-hidden ${className}`}>
      <div
        ref={contentRef}
        className="transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isExpanded ? 'none' : `${maxHeight}px`,
          overflow: 'hidden'
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {isOverflowing && !isExpanded && (
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none transition-opacity duration-500" />
      )}

      {isOverflowing && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={toggleExpand}
            className="flex items-center gap-2 font-AlbertSans font-semibold text-PrimaryColor-0 hover:text-Secondarycolor-0 transition-colors duration-300"
          >
            {isExpanded ? (
              <>
                {collapseText} <GoArrowUp size={20} />
              </>
            ) : (
              <>
                {expandText} <GoArrowDown size={20} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

ExpandableContent.propTypes = {
  htmlContent: PropTypes.string.isRequired,
  maxHeight: PropTypes.number,
  className: PropTypes.string,
  expandText: PropTypes.string,
  collapseText: PropTypes.string,
};

export default ExpandableContent;
