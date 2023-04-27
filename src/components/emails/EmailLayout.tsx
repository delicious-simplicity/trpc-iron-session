import { Body, Text, Container, Head, Html, Img, Preview, Tailwind, Heading } from '@react-email/components';
import { PropsWithChildren } from 'react';
import tailwindConfig from '../../../tailwind.config.mjs';

export function EmailLayout(props: PropsWithChildren<{ previewText: string }>) {
  const { children, previewText } = props;

  return (
    <Tailwind config={tailwindConfig}>
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Body className='bg-[#020617]'>
          <Container className='mx-auto pb-12 pt-5'>
            <Heading className='mb-8 flex items-center gap-x-2 text-lg font-bold text-white'>
              <Img
                src={
                  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4OCIgaGVpZ2h0PSI4OCIgZmlsbD0iIzNiODJmNiIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0xNTIsMjI0YTgsOCwwLDAsMS04LDhIMTEyYTgsOCwwLDAsMSwwLTE2aDMyQTgsOCwwLDAsMSwxNTIsMjI0Wm03MS42Mi02OC4xNy0xMi4zNiw1NS42M2ExNiwxNiwwLDAsMS0yNS41MSw5LjExTDE1OC41MSwyMDBoLTYxTDcwLjI1LDIyMC41N2ExNiwxNiwwLDAsMS0yNS41MS05LjExTDMyLjM4LDE1NS44M2ExNi4wOSwxNi4wOSwwLDAsMSwzLjMyLTEzLjcxbDI4LjU2LTM0LjI2YTEyMy4wNywxMjMuMDcsMCwwLDEsOC41Ny0zNi42N2MxMi45LTMyLjM0LDM2LTUyLjYzLDQ1LjM3LTU5Ljg1YTE2LDE2LDAsMCwxLDE5LjYsMGM5LjM0LDcuMjIsMzIuNDcsMjcuNTEsNDUuMzcsNTkuODVhMTIzLjA3LDEyMy4wNywwLDAsMSw4LjU3LDM2LjY3bDI4LjU2LDM0LjI2QTE2LjA5LDE2LjA5LDAsMCwxLDIyMy42MiwxNTUuODNabS0xMzkuMjMsMzRRNjguMjgsMTYwLjUsNjQuODMsMTMyLjE2TDQ4LDE1Mi4zNiw2MC4zNiwyMDhsLjE4LS4xM1pNMTQwLDEwMGExMiwxMiwwLDEsMC0xMiwxMkExMiwxMiwwLDAsMCwxNDAsMTAwWm02OCw1Mi4zNi0xNi44My0yMC4ycS0zLjQyLDI4LjI4LTE5LjU2LDU3LjY5bDIzLjg1LDE4LC4xOC4xM1oiPjwvcGF0aD48L3N2Zz4='
                }
                width='32'
                height='32'
                alt=''
              />
              Rocket
            </Heading>
            {children}
            <Text className='text-white'>
              Best,
              <br />
              Rocket team
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
