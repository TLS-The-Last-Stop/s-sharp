package com.tls.ssharp.post.service.impl;

import com.tls.ssharp.post.dto.request.PostRequest;
import com.tls.ssharp.post.dto.response.PostResponse;
import com.tls.ssharp.post.entity.Post;
import com.tls.ssharp.post.entity.Tag;
import com.tls.ssharp.post.repository.PostRepository;
import com.tls.ssharp.post.repository.TagRepository;
import com.tls.ssharp.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final TagRepository tagRepository;

    @Transactional
    public void savePost(PostRequest postRequest) {
        Post post = new Post();
        post.setTitle(postRequest.getTitle());
        post.setContent(postRequest.getContent());

        List<Tag> tagList = new ArrayList<>();
        for (String tagName : postRequest.getTags()) {
            Tag tag = tagRepository.findByName(tagName).orElse(null);
            if (tag == null) {
                Tag newTag = new Tag();
                newTag.setName(tagName);
                tag = tagRepository.save(newTag);
            }
            tagList.add(tag);
        }
        post.setTags(tagList);
        postRepository.save(post);
    }

    public List<PostResponse> getAllPost() {
        List<Post> posts = postRepository.findAllByOrderByIdDesc();
        List<PostResponse> postResponses = new ArrayList<>();

        for (Post post : posts) {
            PostResponse postResponse = new PostResponse();
            postResponse.setId(post.getId());
            postResponse.setTitle(post.getTitle());
            postResponse.setContent(post.getContent());
            postResponse.setCreatedAt(post.getCreatedAt());

            List<String> tagNames = new ArrayList<>();
            for (Tag tag : post.getTags()) {
                tagNames.add(tag.getName());
            }
            postResponse.setTags(tagNames);
            postResponses.add(postResponse);
        }
        return postResponses;
    }


    public PostResponse getPostById(long id) {
        Optional<Post> postOptional = postRepository.findById(id);
        PostResponse postResponse = new PostResponse();
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            postResponse.setId(id);
            postResponse.setTitle(post.getTitle());
            postResponse.setContent(getHtmlContent(post.getContent()));
            postResponse.setCreatedAt(post.getCreatedAt());

            List<String> tagNames = new ArrayList<>();
            for (Tag tag : post.getTags()) {
                tagNames.add(tag.getName());
            }
            postResponse.setTags(tagNames);
        }
        return postResponse;
    }

    public void deletePostById(long id) {
        postRepository.deleteById(id);
    }

    public String getHtmlContent(String htmlContent) {
        Document document = Jsoup.parse(htmlContent);
        return document.body().text();
    }

    public String getStyledText(String htmlContent) {
        Document document = Jsoup.parse(htmlContent);
        StringBuilder styledText = new StringBuilder();

        for (Element element : document.body().children()) {
            String tagName = element.tagName();
            String text = element.ownText();

            switch (tagName) {
                case "h1":
                case "h2":
                case "h3":
                case "h4":
                case "h5":
                case "h6":
                case "p":
                case "strong":
                case "em":
                case "span":
                    if (!text.isEmpty()) {
                        styledText.append("<").append(tagName).append(" class='styled-text' data-text='")
                                .append(text).append("'></").append(tagName).append(">");
                    }
                    break;
                default:
                    if (!text.isEmpty()) {
                        styledText.append(text);
                    }
                    break;
            }
        }

        styledText.insert(0, "<style>\n" +
                ".styled-text { visibility: hidden; }\n" +
                ".styled-text::after { content: attr(data-text); visibility: visible; }\n" +
                "</style>");

        return styledText.toString();
    }
}