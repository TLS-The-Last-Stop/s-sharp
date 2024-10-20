package com.tls.ssharp.post.service.impl;

import com.tls.ssharp.post.dto.request.PostRequest;
import com.tls.ssharp.post.dto.response.PostResponse;
import com.tls.ssharp.post.entity.Post;
import com.tls.ssharp.post.entity.Tag;
import com.tls.ssharp.post.repository.PostRepository;
import com.tls.ssharp.post.repository.TagRepository;
import com.tls.ssharp.post.service.PostService;
import com.tls.ssharp.user.entity.UserPrincipal;
import com.tls.ssharp.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;

    @Transactional
    public void savePost(PostRequest postRequest, Authentication authentication) {
        Post post = new Post();
        post.setTitle(postRequest.getTitle());
        post.setContent(postRequest.getContent());
        Long userId = ((UserPrincipal) authentication.getPrincipal()).getId();
        post.setUser(userRepository.getReferenceById(userId));

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
            postResponse.setUsername(post.getUser().getUsername());

            List<String> tagNames = new ArrayList<>();
            for (Tag tag : post.getTags()) {
                tagNames.add(tag.getName());
            }
            postResponse.setTags(tagNames);
        }
        return postResponse;
    }

    public void updatePostById(long id, PostRequest postRequest, Authentication authentication) {
        Post post = postRepository.findById(id).orElse(null);
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

    public void deletePostById(long id) {
        postRepository.deleteById(id);
    }

    public String getHtmlContent(String htmlContent) {
        return htmlContent;
    }
}