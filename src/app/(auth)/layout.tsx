export default function CadastroLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    // URL -> /shop/shoes/nike-air-max-97
    // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
    return (
        <div >
              {children}
      </div>
      )
  }
//   }