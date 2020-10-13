import * as React from 'react'
import { SvgProps as SVGRProps } from '../Icon'

const SvgTicketSharp = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      className="ticket-sharp_svg__ionicon"
      viewBox="0 0 512 512"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M426.24 127.72l-10.94 10.94a29.67 29.67 0 01-42-42l10.94-10.94L314.52 16l-88 88-4 12.09-12.09 4L16 314.52l69.76 69.76 10.94-10.94a29.67 29.67 0 0142 42l-10.94 10.94L197.48 496l194.4-194.4 4-12.09 12.09-4 88-88zm-208.56 5.43l21.87-21.87 33 33-21.88 21.87zm43 43l21.88-21.88 32.52 32.52-21.88 21.88zm42.56 42.56l21.88-21.88 32.52 32.52-21.84 21.93zm75.57 75.56l-33-33 21.87-21.88 33 33z" />
    </svg>
  )
}

export default SvgTicketSharp