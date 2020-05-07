import React, { forwardRef, ReactElement, useEffect } from "react"

interface InjectorProps {
    value?: any
    multiple?: boolean
    children: ReactElement
    validator?: (value: any) => boolean
    onChange?: (event: any) => void
}

export const Validator = forwardRef<any, InjectorProps>(
    ({ validator, children, multiple }: InjectorProps, ref: any) => {
        function injectValidator(event: any) {
            validation(event.target.value || event.target.textContent)
        }
        function validation(value: any) {
            ref.current?.classList.add("touched")
            if (!validator!(value)) ref.current?.classList.add("invalid")
            else ref.current?.classList.remove("invalid")
        }

        function classValidation() {
            const classes = Array<string>()
            if (!!multiple) {
                if (children.props.value.length > 0) {
                    classes.push("touched")
                    if (!validator!(children.props.value)) classes.push("invalid")
                }
            } else {
                if (!!children.props.value) {
                    classes.push("touched")
                    if (!validator!(children.props.value)) classes.push("invalid")
                }
            }
            return classes.join(" ")
        }

        function render() {
            if (multiple) {
                return (
                    <span ref={ref} className={classValidation()} onClickCapture={injectValidator}>
                        {children}
                    </span>
                )
            }
            return (
                <span ref={ref} className={classValidation()} onChangeCapture={injectValidator}>
                    {children}
                </span>
            )
        }

        return render()
    }
)
