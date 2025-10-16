export interface FeedData {
    _id: string | number
    url: string
    is_javascript_enabled: boolean
    feed_type: string
    item_xpath: string
    title_xpath: string
    description_xpath: string
    date_regex: string
    date_xpath: string
    use_index_date: boolean
    item_url_pre_literal: string
    item_url_xpath: string
    item_url_post_literal: string
    source_name: string
    source_url: string
    image_url_pre_literal: string
    image_url_xpath: string
    image_url_post_literal: string
    default_image_url: string
    feed_name: string
    feed_description: string
    created_by: string
    updated_by: string
    created_at: string 
    updated_at: string
    legacy_fields?: Record<string, unknown>
}