import { NextPageContext } from 'next'
import { ReactElement } from 'react'

import { EditReportPage } from '../../components/reports/ReportPage'
import renderPage from '../../renderPage'
import { Badge, Tag } from '../../types'
import { doBulkLookup } from '../../utils'

type CreateReportPageProps = {
  nameToCode: { [key: string]: string }
  authenticated: boolean | null
  badges: Badge[]
  tags: Tag[]
}

const CreateReportPage = (props: CreateReportPageProps): ReactElement => {
  return <EditReportPage {...props} report={null} />
}

CreateReportPage.getInitialProps = async (ctx: NextPageContext) => {
  return await doBulkLookup(
    [
      ['nameToCode', '/clubs/fields/?format=json'],
      ['badges', '/badges/?format=json'],
      ['tags', '/tags/?format=json'],
    ],
    ctx,
  )
}

CreateReportPage.permissions = ['clubs.generate_reports']

export default renderPage(CreateReportPage)
