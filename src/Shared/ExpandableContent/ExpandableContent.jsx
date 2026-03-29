import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';

const ExpandableContent = ({
  htmlContent,
  children,
  maxHeight = 300,
  className = '',
  expandText = 'Read more',
  collapseText = 'Show less'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > maxHeight + 40);
    }
  }, [htmlContent, children, maxHeight]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className={`relative ${className}`}>
      {/* Content */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          maxHeight: isExpanded
            ? `${contentRef.current?.scrollHeight || 2000}px`
            : `${maxHeight}px`,
        }}
      >
        {children || (htmlContent && (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        ))}
      </div>

      {/* Fade overlay */}
      {isOverflowing && !isExpanded && (
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/70 via-white/30 to-transparent" />
      )}

      {/* Text toggle */}
      {isOverflowing && (
        <div className="flex justify-center -mt-5 relative z-10">
          <button
            onClick={toggleExpand}
            className="
              group flex items-center gap-1
              text-[15px] font-semibold
              text-PrimaryColor-0
              hover:opacity-80
              transition-all duration-300
            "
          >
            <span className="relative">
              {isExpanded ? collapseText : expandText}

              {/* subtle underline */}
              <span className="
                absolute left-0 -bottom-0.5 h-[1px] w-0
                bg-PrimaryColor-0/70
                transition-all duration-300
                group-hover:w-full
              " />
            </span>

            {isExpanded ? (
              <GoArrowUp
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-[2px]"
              />
            ) : (
              <GoArrowDown
                size={15}
                className="transition-transform duration-300 group-hover:translate-y-[2px]"
              />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

ExpandableContent.propTypes = {
  htmlContent: PropTypes.string,
  children: PropTypes.node,
  maxHeight: PropTypes.number,
  className: PropTypes.string,
  expandText: PropTypes.string,
  collapseText: PropTypes.string,
};

export default ExpandableContent;
